@echo off

if exist "C:\Program Files\PostgreSQL\10\bin\pg_dump.exe" (
	"C:\Program Files\PostgreSQL\10\bin\psql.exe" -U postgres --host=127.0.0.1 -f CreateDefault.sql
) else (
	"C:\Program Files (x86)\PostgreSQL\10\bin\psql.exe" -U postgres --host=127.0.0.1 -f CreateDefault.sql
)
