using Microsoft.EntityFrameworkCore.Migrations;

namespace BugTracker.API.Migrations
{
    public partial class ticket7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "submissionDate",
                table: "Tickets",
                newName: "SubmissionDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SubmissionDate",
                table: "Tickets",
                newName: "submissionDate");
        }
    }
}
