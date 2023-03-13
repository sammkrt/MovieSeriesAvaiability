using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using movieAvaiability.Api.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ShowContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ShowContext") ?? throw new InvalidOperationException("Connection string 'ShowContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.AddScoped<IUtellyService, UtellyService>();
builder.Services.AddScoped<IWatchListService, WatchListService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("AllowOrigin");

app.Run();
