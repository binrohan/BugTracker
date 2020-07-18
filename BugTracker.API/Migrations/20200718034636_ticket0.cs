using Microsoft.EntityFrameworkCore.Migrations;

namespace BugTracker.API.Migrations
{
    public partial class ticket0 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTickets");

            migrationBuilder.AddColumn<string>(
                name: "userId",
                table: "Tickets",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "UserTickets",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TicketId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTickets", x => new { x.UserId, x.TicketId });
                    table.ForeignKey(
                        name: "FK_UserTickets_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTickets_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserTickets_TicketId",
                table: "UserTickets",
                column: "TicketId");
        }
    }
}
