using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;


namespace ChicagoJazzPlaces
{
    public class Startup
    {
        private IConfiguration configuration { get; set; }
        /*this is not a method - it is a constructir.  
        Notice that it has the same name as the class and does not have a return value.
        ASP.NET Core comes with dependancy injection, IConfiguration will be injected */
        public Startup(IConfiguration injectedConfiguration)
        {
            configuration = injectedConfiguration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // despite it's name, this method does no configuration, it only adds services.
        // Configuration is dont in Configure method of this class.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //This service adds a client a simple client side directory browser
            services.AddDirectoryBrowser();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Keyword is 'pipeline' the order in which the services are added will be the order they are executed in the pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //Redirects a request without directory to index.html
            app.UseDefaultFiles();

            //Serves the static files under wwwroot.
            app.UseStaticFiles();


            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
                RequestPath = "/directoryBrowser"
            });
            //this allows us to browse all the available client side files by going to http://<server-address>/directory-browser.
            //this poses a security risk and should be disables in production.
            app.UseDirectoryBrowser(new DirectoryBrowserOptions
            {
                FileProvider = new PhysicalFileProvider(System.IO.Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
                RequestPath = "/directoryBrowser"
            });
        }
    }
}
