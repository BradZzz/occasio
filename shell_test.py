import socket, ssl, struct, argparse,json
from conn_commands import Command

parser = argparse.ArgumentParser(description='Proprietary EPP Server')
parser.add_argument('action')
parser.add_argument('domain')
args = parser.parse_args()

print json.dumps({ 'action' : args.action })
print json.dumps({ 'domain' : args.domain })