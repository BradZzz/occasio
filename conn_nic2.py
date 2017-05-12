import socket, ssl

#client = EppClient(ssl_keyfile='occasio.key', ssl_certfile='cacert.pem', ssl_cacerts='root.pem')

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(60)  # regular timeout

sock = ssl.wrap_socket(sock, "occasio.key", "cacert.pem",
                       server_side=False,
                       cert_reqs=ssl.CERT_REQUIRED,
                       ca_certs="root.pem",
                       ciphers='AES256-SHA')

sock.connect(('ote.nic.io', 700))