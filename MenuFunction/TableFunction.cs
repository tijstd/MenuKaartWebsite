using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Data.Tables;
using Azure;
using System.Text;





namespace MenuFunction
{
    // C# record type for items in the table
    public record Product : ITableEntity
    {
        public string RowKey { get; set; } = default!;



        public string PartitionKey { get; set; } = default!;



        public string Status { get; init; } = default!;



        public string TotalPrice { get; init; }



        public ETag ETag { get; set; } = default!;



        public DateTimeOffset? Timestamp { get; set; } = default!;
    }





    public static class TableFunction
    {
        [FunctionName("TableFunction")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");





            string Price;
            


            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            Price = data?.TotalPrice;






            string responseMessage = "NeedToReturnSomething";

            string connString = Environment.GetEnvironmentVariable("ConnectionString");


            var filename = Guid.NewGuid().ToString();
            byte[] byteArray = Encoding.ASCII.GetBytes(requestBody);
            MemoryStream stream = new MemoryStream(byteArray);
            Azure.Storage.Blobs.BlobClient blobClient = new Azure.Storage.Blobs.BlobClient(
            connectionString: connString,
            blobContainerName: "orders",
            blobName: $"{filename}.json");



            // upload the file
            blobClient.Upload(stream);

            // New instance of the TableClient class
            TableServiceClient tableServiceClient = new TableServiceClient(connString);



            // New instance of TableClient class referencing the server-side table
            TableClient tableClient = tableServiceClient.GetTableClient(
                tableName: "Order"
            );



            await tableClient.CreateIfNotExistsAsync();



            // Trigger stuff
            if (!string.IsNullOrEmpty(Price))
            {
                Console.WriteLine("This would be your table");



                // Create new item using composite key constructor
                var prod1 = new Product()
                {
                    RowKey = filename,
                    PartitionKey = "Order",
                    Status = "Processed",
                    TotalPrice = Price,
                };



                // Add new item to server-side table
                await tableClient.AddEntityAsync<Product>(prod1);
            }



            return new OkObjectResult(responseMessage);
        }

    }
}