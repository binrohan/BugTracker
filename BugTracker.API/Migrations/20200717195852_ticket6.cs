using Microsoft.EntityFrameworkCore.Migrations;

namespace BugTracker.API.Migrations
{
    public partial class ticket6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_AspNetUsers_AssingedUserId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_AssingedUserId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "AssingedUserId",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Tickets",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserId",
                table: "Tickets",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_AspNetUsers_UserId",
                table: "Tickets",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_AspNetUsers_UserId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_UserId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "AssingedUserId",
                table: "Tickets",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_AssingedUserId",
                table: "Tickets",
                column: "AssingedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_AspNetUsers_AssingedUserId",
                table: "Tickets",
                column: "AssingedUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
