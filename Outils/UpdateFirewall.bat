@echo off
netsh advfirewall firewall add rule name="TCP Psql 5432" dir=in action=allow protocol=TCP localport=5432
netsh advfirewall firewall add rule name="TCP Psql 5432" dir=out action=allow protocol=TCP localport=5432
pause
