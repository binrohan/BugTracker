using Microsoft.EntityFrameworkCore.Migrations;

namespace BugTracker.API.Migrations
{
    public partial class ticket5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_AspNetUsers_userId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_userId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "AssingedUserId",
                table: "Tickets",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "userId",
                table: "Tickets",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_userId",
                table: "Tickets",
                column: "userId",
                unique: true,
                filter: "[userId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_AspNetUsers_userId",
                table: "Tickets",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
