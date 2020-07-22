using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BugTracker.API.Data;
using BugTracker.API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace BugTracker.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultSqlServerConnection")));





            IdentityBuilder builder = services.AddIdentityCore<User>( opt =>
           {
               opt.Password.RequireDigit = false;
               opt.Password.RequiredLength = 4;
               opt.Password.RequireNonAlphanumeric = false;
               opt.Password.RequireUppercase = false;
               opt.User.AllowedUserNameCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 1234567890";
           } );

           builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
           builder.AddEntityFrameworkStores<DataContext>();
           builder.AddRoleValidator<RoleValidator<Role>>();
           builder.AddRoleManager<RoleManager<Role>>();
           builder.AddSignInManager<SignInManager<User>>();





            // services.AddDbContext<DataContext>(options =>  
            //     options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            // services.AddIdentity<User, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
            //     .AddEntityFrameworkStores<DataContext>();

            // services.Configure<IdentityOptions>(options =>
            // {
            //     // Default Password settings.
            //     options.Password.RequireDigit = false;
            //     options.Password.RequireLowercase = false;
            //     options.Password.RequireNonAlphanumeric = false;
            //     options.Password.RequireUppercase = false;
            //     options.Password.RequiredLength = 4;
            //     options.Password.RequiredUniqueChars = 0;
            // });
            services.Configure<IdentityOptions>(options =>
            {
                // Default User settings.
                options.User.RequireUniqueEmail = true;

            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {Console.WriteLine("****************************AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA*****************************"+(ClaimTypes.NameIdentifier));
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration
                        .GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddMvc(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                   .RequireAuthenticatedUser()
                   .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })  // added a nuget 
                .AddNewtonsoftJson(o =>
                {
                    o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            services.AddAutoMapper(typeof(BugTrackerRepository).Assembly);
            services.AddControllers();
            services.AddCors();
            services.AddAutoMapper(typeof(BugTrackerRepository).Assembly);
            services.AddScoped<IBugTrackerRepository, BugTrackerRepository>();
            // services.AddScoped<logUserActivity>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            
            // app.UseHttpsRedirection();
            
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
