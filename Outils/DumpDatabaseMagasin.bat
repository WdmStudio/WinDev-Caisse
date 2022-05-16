@echo off

set CUR_YYYY=%date:~6,4%
set CUR_MM=%date:~3,2%
set CUR_DD=%date:~0,2%
set CUR_HH=%time:~0,2%

set CUR_NN=%time:~3,2%
set CUR_SS=%time:~6,2%
set CUR_MS=%time:~9,2%

set SUBFILENAME=dump-%CUR_YYYY%%CUR_MM%%CUR_DD%-%CUR_HH%%CUR_NN%%CUR_SS%.sql

echo %SUBFILENAME%

if exist "C:\Program Files\PostgreSQL\10\bin\pg_dump.exe" (
	"C:\Program Files\PostgreSQL\10\bin\pg_dump.exe" -U magasin --host=127.0.0.1 -f %SUBFILENAME% magasin
) else (
	"C:\Program Files (x86)\PostgreSQL\10\bin\pg_dump.exe" -U magasin --host=127.0.0.1 -f %SUBFILENAME% magasin
)

pause