import sanityClient from "@sanity/client";

console.log(process.env.PROJECT_ID);
export const client = sanityClient({
  projectId: "k0fwoyb9",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: false,
  token:
    "skhQx5SmoV4o8rfOezUv2tyIvXKZymDn5xWCjH03V6Og4JtQMW870a5GtIluNSxCXT53TWXy8SjrPrS3cKcOtOpBIpUFCKwFFBNjp0SzW8hEaYfUoF1ekZdrHsKpaSCl4EBJOLHyF3WzsTPpMc3tlk4Kp96om1xUj2oWJk5Aeqd75n3WySpC",
});
