const express = require('express')
const { default: mongoose } = require("mongoose");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Supplier = require('../models/supplierModel');
const SupplierOrder = require('../models/supplierOrderModel');

const router = express.Router()


// Function to generate a random number
const generateRandomNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Add new supplier
router.post('/add', async (req, res) => {
  try {
    // Generate a random number for supId
    const supId = `SID${generateRandomNumber()}`;

    // Create a new supplier with the generated supId
    const newSupplier = new Supplier({ ...req.body, supId });

    // Save the new supplier to the database
    await newSupplier.save();

    res.status(201).send(newSupplier);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update supplier details
router.put('/update/:id', async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSupplier) {
      return res.status(404).send({ message: 'Supplier not found' });
    }
    res.send(updatedSupplier);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a supplier
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      return res.status(404).send({ message: 'Supplier not found' });
    }
    res.send({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all supplier details
router.get('/all', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.send(suppliers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//report
router.get('/generate-pdf', async (req, res) => {
  try {
    const doc = new PDFDocument();
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="supplier_report.pdf"');
      res.send(pdfData);
    });

    // Generate PDF Header
    doc.text('Supply Management Report', { align: 'center', fontSize: 30, bold: true, margin: 10 });

    doc.font('Helvetica');
    doc.fontSize(12);

    // Fetch Data from MongoDB
    const totalSuppliersCount = await Supplier.countDocuments();
    const currentMonthSuppliers = await Supplier.find({
      date: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      }
    });

    const suppliersByMaterial = await Supplier.aggregate([
      {
        $group: {
          _id: "$supMaterial",
          count: { $sum: 1 },
          names: { $push: "$supname" }
        }
      }
    ]);

    // Generate PDF Content
    doc.moveDown();
    doc.text(`Registered Supplier Count: ${totalSuppliersCount}`, { margin: 10 });
    doc.moveDown();
    doc.text(`This Month's Registered Suppliers: ${currentMonthSuppliers.length}`, { margin: 10 });
    doc.moveDown();
    suppliersByMaterial.forEach(material => {
      doc.moveDown();
      doc.text(`${material._id} Suppliers`, { underline: true });
      doc.text(`Supplier Count: ${material.count}`, { indent: 20 });
      doc.text(`Supplier Names: ${material.names.join(', ')}`, { indent: 20 });
    });

    // Add border
    doc.rect(50, 50, doc.page.width - 100, doc.page.height - 100).stroke();

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Route to add an order
router.post('/addorder', async (req, res) => {
  try {
    const { orderId, supname, quantity, unitcost, duedate, status } = req.body;

    // Calculate the amount
    const amount = quantity * unitcost;

    const newOrder = new SupplierOrder({
      orderId,
      supname,
      quantity,
      unitcost,
      duedate,
      status: status || 'Pending',
      amount
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all orders
router.get('/allorders', async (req, res) => {
  try {
    const orders = await SupplierOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//invoice print
router.get('/generate-order-pdf/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Fetch the specific order from MongoDB
    const order = await SupplierOrder.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const doc = new PDFDocument();
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="order_${orderId}.pdf"`);
      res.send(pdfData);
    });

    // Styling
    doc.font('Helvetica');
    doc.fontSize(24); // Increase font size for the header

    // Generate PDF Header with underline
    doc.text('Invoice', { align: 'center', bold: true, underline: true, margin: 10 });

    // Reset font size for the rest of the content
    doc.fontSize(16);

    // Generate PDF Content for the specific order
    doc.moveDown();
    const items = [
      { label: ' ~ Order Id', value: order.orderId },
      { label: ' ~ Supplier Name', value: order.supname },
      { label: ' ~ Order date', value: new Date(order.orderdate).toDateString() },
      { label: ' ~ Order due date', value: new Date(order.duedate).toDateString() },
      { label: ' ~ Quantity', value: order.quantity },
      { label: ' ~ Per Unit Cost', value: order.unitcost },
      { label: ' ~ Amount', value: order.amount }
    ];
    for (const item of items) {
      doc.text(`${item.label} : ${item.value}`);
      doc.moveDown(); // Add vertical space between items
    }

    // Add border
    doc.rect(50, 50, doc.page.width - 100, doc.page.height - 100).stroke();

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;