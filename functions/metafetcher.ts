import { Handler } from "@netlify/functions";
import fetch from "isomorphic-unfetch";
import * as cheerio from "cheerio";

export const handler: Handler = async (event, context) => {
  //   console.log("queryStringParameters", event.queryStringParameters);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Max-Age": "2592000",
    "Access-Control-Allow-Credentials": "true",
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers };
    }
    if (event.httpMethod === "GET") {
      let meta;
      if (event.queryStringParameters?.url) {
        const res = await fetch(event.queryStringParameters?.url);
        const content = await res.text();
        const $ = cheerio.load(content);
        const head = $("head");
        const title = head.find("title").text();
        const description = head
          .find('meta[name="description"]')
          .attr("content");
        const image = head.find('meta[property="og:image"]').attr("content");
        meta = { title, description, image: { url: image } };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "Please enter an url with url query parameter",
          }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: 1,
          meta,
        }),
        headers,
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: 0,
          message: "Only GET method is allowed",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: 0,
        message: "Only absolute URLs are supported via query parameters url",
      }),
    };
  }
};
