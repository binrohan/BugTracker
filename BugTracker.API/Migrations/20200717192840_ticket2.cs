using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BugTracker.API.Migrations
{
    public partial class ticket2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Projects_ProjectId",
                table: "Tickets");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Tickets",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "Tickets",
                newName: "projectId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_ProjectId",
                table: "Tickets",
                newName: "IX_Tickets_projectId");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Tickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "projectId",
                table: "Tickets",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "submissionDate",
                table: "Tickets",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Title",
                table: "Tickets",
                column: "Title",
                unique: true,
                filter: "[Title] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Projects_projectId",
                table: "Tickets",
                column: "projectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Projects_projectId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_Title",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "submissionDate",
                table: "Tickets");

            migrationBuilder.RenameColumn(
                name: "projectId",
                table: "Tickets",
                newName: "ProjectId");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Tickets",
                newName: "description");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_projectId",
                table: "Tickets",
                newName: "IX_Tickets_ProjectId");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Tickets",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Projects_ProjectId",
                table: "Tickets",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
