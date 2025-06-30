const factory = require('./handlerFactory');
const Reference = require('../models/referenceModel')

exports.getAllReferences = factory.getAll(Reference);
exports.createReference = factory.createOne(Reference);
exports.getReference = factory.getOne(Reference);
exports.updateReference = factory.updateOne(Reference);