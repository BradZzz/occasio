import socket, ssl, struct, argparse
from conn_commands import Command

#client = EppClient(ssl_keyfile='occasio.key', ssl_certfile='cacert.pem', ssl_cacerts='root.pem')

parser = argparse.ArgumentParser(description='Proprietary EPP Server')

parser.add_argument('--d', '--domain', help='domain to run the action against')
parser.add_argument('--a', '--action', help='the action defined for the EPP request')
args = parser.parse_args()

print args.a
print args.d

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(60)
sock = ssl.wrap_socket(sock, keyfile="occasio.key", certfile="cacert.pem", server_side=True, cert_reqs=ssl.CERT_REQUIRED,
                       ca_certs="/home/bitnami/occasio/python2713/lib/python2.7/site-packages/certifi/cacert.pem")

try:
  sock.connect(('ote.nic.io', 700))
  print "\n<===== Greeting =======>\n"
  print sock.recv()
  print "\n<===== Greeting Finished =======>\n"
  command = Command(args.d, args.a, sock)
  command.login()

  # command.check()
  # command.backorder()

  actions = {
    'create' : command.createDomain,
    'backorder' : command.backorder,
  }

  if args.a in actions:
    actions[args.a]()

finally:
  sock.close()