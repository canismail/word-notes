#!/usr/bin/env python
# coding: utf8

from platform import system as system_name # Returns the system/OS name
from os import system as sistem     # Execute a shell command

def ping(host):
		try:
			parameters = "-n 1" if system_name().lower()=="windows" else "-c 1"
			return sistem("ping " + parameters + " " + host) == 0
		except ValueError:
			return "Dont Send Message";

host = str(input("Enter IP Adress: "))
ping(host)

#216.58 209.163