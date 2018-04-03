using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ChicagoJazzPlaces
{
    /*This is the entry to a .NET Core.  It sets up ASP.NET core for us by building a webhost and passing it
    our startup.cs file which acts as an entry for our web app */
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        /*This is an expression bodied memmber - a very concise way to add one-expression memmbers. 
        new feature in C#6 which threw me had at first*/
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
