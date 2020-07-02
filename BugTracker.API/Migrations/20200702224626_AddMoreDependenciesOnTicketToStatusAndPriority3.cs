﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace BugTracker.API.Migrations
{
    public partial class AddMoreDependenciesOnTicketToStatusAndPriority3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTicket_Tickets_TicketId",
                table: "UserTicket");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTicket_AspNetUsers_UserId",
                table: "UserTicket");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTicket",
                table: "UserTicket");

            migrationBuilder.RenameTable(
                name: "UserTicket",
                newName: "UserTickets");

            migrationBuilder.RenameIndex(
                name: "IX_UserTicket_TicketId",
                table: "UserTickets",
                newName: "IX_UserTickets_TicketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTickets",
                table: "UserTickets",
                columns: new[] { "UserId", "TicketId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserTickets_Tickets_TicketId",
                table: "UserTickets",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTickets_AspNetUsers_UserId",
                table: "UserTickets",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTickets_Tickets_TicketId",
                table: "UserTickets");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTickets_AspNetUsers_UserId",
                table: "UserTickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTickets",
                table: "UserTickets");

            migrationBuilder.RenameTable(
                name: "UserTickets",
                newName: "UserTicket");

            migrationBuilder.RenameIndex(
                name: "IX_UserTickets_TicketId",
                table: "UserTicket",
                newName: "IX_UserTicket_TicketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTicket",
                table: "UserTicket",
                columns: new[] { "UserId", "TicketId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserTicket_Tickets_TicketId",
                table: "UserTicket",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTicket_AspNetUsers_UserId",
                table: "UserTicket",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
