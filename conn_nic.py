import socket, ssl

# sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# sock.settimeout(60)  # regular timeout
#
# sock = ssl.wrap_socket(sock, "key.pem", "cert.pem",
#        server_side=False,
#        cert_reqs=ssl.CERT_REQUIRED,
#        ca_certs="root_certificate.pem",
#        ssl_version=ssl.PROTOCOL_TLSv1_2,
#        ciphers='AES256-SHA')
#
# sock.connect(('epptestv3.iis.se', 700))

# query = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><epp xmlns="urn:ietf:params:xml:ns:epp-1.0"><command><info>' \
#         '<domain:info xmlns:domain="urn:ietf:params:xml:ns:domain-1.0"><domain:name hosts="all">sht.io</domain:name><domain:authInfo>' \
#         "<domain:pw>.[<2&q'xKn9NMdD:</domain:pw></domain:authInfo></domain:info></info><clTRID>NIC-1253</clTRID></command></epp>" \

# context = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
# context.verify_mode = ssl.CERT_REQUIRED
# context.check_hostname = True
# context.load_default_certs()
#
# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# ssl_sock = context.wrap_socket(s, server_hostname='ote.nic.io')
# ssl_sock.connect(('ote.nic.io', 700))
# ssl_sock.sendall(query)
# pprint.pprint(ssl_sock.recv(1024).split(b"\r\n"))

from eppy.client import EppClient

client = EppClient(cacerts='root.crt')
client.connect('ote.nic.io')
resp = client.login('NIC-1253', ".[<2&q'xKn9NMdD:")

from eppy.doc import EppInfoDomainCommand
cmd = EppInfoDomainCommand()
cmd.name = "sht.io"
print cmd
resp.write(cmd)