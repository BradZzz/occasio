import socket, ssl, struct, argparse,json
from conn_commands import Command

parser = argparse.ArgumentParser(description='Proprietary EPP Server')
parser.add_argument('action')
parser.add_argument('domain')
args = parser.parse_args()

print json.dumps({ 'action' : args.action })
print json.dumps({ 'domain' : args.domain })

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(60)
sock = ssl.wrap_socket(sock, keyfile="occasio.key", certfile="cacert.pem", server_side=True, cert_reqs=ssl.CERT_REQUIRED,
                       ca_certs="/home/bitnami/occasio/python2713/lib/python2.7/site-packages/certifi/cacert.pem")

try:
  sock.connect(('ote.nic.io', 700))
  # data = sock.recv().decode('utf-8')
  # print sock.recv()
  print json.dumps({ 'greeting' : sock.recv() })
  command = Command(args.domain, args.action, sock)
  command.login()

  actions = {
    'create' : command.createDomain,
    'backorder' : command.backorder,
  }

  if args.a in actions:
    actions[args.a]()

finally:
  sock.close()