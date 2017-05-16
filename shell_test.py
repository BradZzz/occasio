import json,argparse

parser = argparse.ArgumentParser(description='Proprietary EPP Server')

parser.add_argument('action')
parser.add_argument('domain')

# parser.add_argument('--d', '--domain', help='domain to run the action against')
# parser.add_argument('--a', '--action', help='the action defined for the EPP request')
args = parser.parse_args()

print json.dumps({ 'action' : args.action })
print json.dumps({ 'domain' : args.domain })

# print args.a
# print args.d

print json.dumps({ 'msg' : 'complete' })
print json.dumps({ "msg" : "complete2" })
print json.dumps({ "msg" : "complete3" })