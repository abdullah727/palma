"use strict";
const { sanitizeEntity, parseMultipartData } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.activities.create(data, { files });
    } else {
      entity = await strapi.services.activities.create(ctx.request.body);
    }
    // sending email through strapi local(built-in) plugin
    await strapi.plugins["email"].services.email.send({
      to: "info@mallorcard.es",
      from: "abdullahsaud2010@hotmail.com",
      subject: "Record created successfully",
      text: "Record created successfully",
    });
    return sanitizeEntity(entity, { model: strapi.models.activities });
  },
  // custom PUT /activities_price endpoint
  async update(ctx) {
    const records = await strapi.services.activities.find();
    let entity;
    // looping through the whole data to update the price by the given discounted value
    for (let i = 0; i < records.length; i++) {
      const ele = records[i];
      const discount = (ele.Price * ctx.request.body.Discount) / 100;
      entity = await strapi.services.activities.update(
        { id: ele._id },
        { Price: ele.Price - discount }
      );
    }
    return sanitizeEntity(entity, { model: strapi.models.activities });
  },
};
