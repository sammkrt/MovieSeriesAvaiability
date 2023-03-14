using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace movieAvaiability.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedDate",
                table: "WatchListItems");

            migrationBuilder.RenameColumn(
                name: "DisplayName",
                table: "WatchListItems",
                newName: "Title");

            migrationBuilder.AddColumn<string>(
                name: "Term",
                table: "WatchListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Term",
                table: "WatchListItems");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "WatchListItems",
                newName: "DisplayName");

            migrationBuilder.AddColumn<DateTime>(
                name: "AddedDate",
                table: "WatchListItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
