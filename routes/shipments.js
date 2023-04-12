"use strict";

const { BadRequestError } = require("../expressError");
const jsonschema = require("jsonschema");
const orderschema = require("../schemas/orderschema.json");
const express = require("express");

const router = new express.Router();

const { shipProduct } = require("../shipItApi");

/** POST /shipments
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {

  const result = jsonschema.validate(
    req.body,
    orderschema,
    { required: true }
  );
  // TODO: change input to match doc string - currently missing "order:"
  if (!result.valid) {
    // pass validation errors to error handler
    //  (the "stack" key is generally the most useful)
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;