const express = require("express");
const { getAllReferences, createReference, getReference, updateReference } = require("../controllers/referenceController");

const router = express.Router()

router
    .route('/')
    .get(getAllReferences)
    .post(createReference)
router
    .route('/:id')
    .get(getReference)
    .post(updateReference)

module.exports = router;