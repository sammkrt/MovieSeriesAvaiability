using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using movieAvaiability.Api.Models;

    public class ShowContext : DbContext
    {
        public ShowContext (DbContextOptions<ShowContext> options)
            : base(options)
        {
        }
        public DbSet<Show> Shows { get; set; } = default!;
    }
