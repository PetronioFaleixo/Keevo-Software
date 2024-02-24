using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIWeb.Migrations
{
    public partial class AddStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Tarefas",
                newName: "StatusModelId");

            migrationBuilder.AddColumn<long>(
                name: "StatusId",
                table: "Tarefas",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Codigo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tarefas_StatusModelId",
                table: "Tarefas",
                column: "StatusModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tarefas_Status_StatusModelId",
                table: "Tarefas",
                column: "StatusModelId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tarefas_Status_StatusModelId",
                table: "Tarefas");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropIndex(
                name: "IX_Tarefas_StatusModelId",
                table: "Tarefas");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Tarefas");

            migrationBuilder.RenameColumn(
                name: "StatusModelId",
                table: "Tarefas",
                newName: "Status");
        }
    }
}
