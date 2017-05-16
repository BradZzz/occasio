import socket, ssl, struct, argparse
from conn_commands import command

#client = EppClient(ssl_keyfile='occasio.key', ssl_certfile='cacert.pem', ssl_cacerts='root.pem')

parser = argparse.ArgumentParser(description='Proprietary EPP Server')

parser.add_argument('--d', '--domain', help='domain to run the action against')
parser.add_argument('--a',  '-action', help='the action defined for the EPP request')
args = parser.parse_args()

print args.domain
print args.action

# User ID : 	NIC-1253
# Contact Name : 	Giant Steps
# Organization Name : 	Giant Steps
# Street : 	PO Box 23170
# City : 	Saint Louis
# State : 	Missouri
# Postal Code : 	63156
# Country: 	USA

# sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# sock.settimeout(60)
# sock = ssl.wrap_socket(sock, keyfile="occasio.key", certfile="cacert.pem", server_side=True, cert_reqs=ssl.CERT_REQUIRED,
#                        ca_certs="/home/bitnami/occasio/python2713/lib/python2.7/site-packages/certifi/cacert.pem")
#
# try:
#   #conn.connect((HOST, PORT))
#   sock.connect(('ote.nic.io', 700))
#   print "\n<===== Greeting =======>\n"
#   print sock.recv()
#   print "\n<===== Greeting Finished =======>\n"
#   login(sock)
#   check(sock)
#   backorder(sock)
# finally:
#   sock.close()