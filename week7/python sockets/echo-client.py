#!/usr/bin/env python3

import socket

HOST = '127.0.0.1'  
PORT = 65433       

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(b'Loic HILLION')
    data = s.recv(1024)

print('Received', repr(data))