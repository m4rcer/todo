using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApi1.Migrations
{
    public partial class changing_isComplete_on_todoStep : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsComplete",
                table: "TodoItems",
                newName: "TodoStep");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "TodoItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "TodoItems");

            migrationBuilder.RenameColumn(
                name: "TodoStep",
                table: "TodoItems",
                newName: "IsComplete");
        }
    }
}
