using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIWeb.Migrations
{
    public partial class AjustandoStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tarefas_Status_StatusModelId",
                table: "Tarefas");

            migrationBuilder.AlterColumn<long>(
                name: "StatusModelId",
                table: "Tarefas",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Tarefas_Status_StatusModelId",
                table: "Tarefas",
                column: "StatusModelId",
                principalTable: "Status",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tarefas_Status_StatusModelId",
                table: "Tarefas");

            migrationBuilder.AlterColumn<long>(
                name: "StatusModelId",
                table: "Tarefas",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tarefas_Status_StatusModelId",
                table: "Tarefas",
                column: "StatusModelId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
