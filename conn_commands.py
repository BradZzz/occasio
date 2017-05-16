import struct

class Command:

  def __init__(self, domain, action, conn):

    print domain
    print action

    self.conn = conn
    self.info = {
      "clID":"NIC-1253",
      "clIDBilling":"NIC-1259849",
      "clTRID":"abcde12345",
      "ns1":"oswald.ns.cloudflare.com",
      "ns2":"rita.ns.cloudflare.com",
      "pw":".[&lt;2&amp;q'xKn9NMdD:",
      "testDomain":domain,
      "testBackorder":domain,
      "testCheck01":"biscuits.io",
      "testCheck02":"ninja.io",
      "infoDomain":"cyborgs.io",
      "years":"2",
    }

  def login(self):
    login_com = """
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <epp xmlns="urn:ietf:params:xml:ns:epp-1.0">
        <command>
          <login>
            <clID>""" + self.clID + """</clID>
            <pw>""" +self.pw + """</pw>
            <options>
              <version>1.0</version>
              <lang>en</lang>
            </options>
            <svcs>
              <objURI>urn:ietf:params:xml:ns:domain-1.0</objURI>
              <objURI>urn:ietf:params:xml:ns:contact-1.0</objURI>
              <objURI>urn:ietf:params:xml:ns:secDNS-1.1</objURI>
              <objURI>http://www.dir.org/xsd/account-1.0</objURI>
              <objURI>http://www.dir.org/xsd/future-1.0</objURI>
            </svcs>
          </login>
        <clTRID>""" + self.clTRID + """</clTRID>
        </command>
      </epp>
    """

    print login_com
    self.send_(login_com)
    print self.receive()
    print "\n"

  def hello(self):
    hello = """
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <epp xmlns="urn:ietf:params:xml:ns:epp-1.0">
      <hello/>
    </epp>
    """

    print hello
    self.send_(hello)
    print self.receive()
    print "\n"

  def info(self):
    info = """
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <epp xmlns="urn:ietf:params:xml:ns:epp-1.0">
      <command>
        <info>
          <domain:info
           xmlns:domain="urn:ietf:params:xml:ns:domain-1.0">
            <domain:name hosts="all">""" + self.infoDomain + """</domain:name>
          </domain:info>
        </info>
        <clTRID>""" + self.clTRID + """</clTRID>
      </command>
    </epp>
    """

    print info
    self.send_(info)
    print self.receive()
    print "\n"

  def createDomain(self):
    create = """
    <?xml version="1.0" encoding="UTF-8"?>
    <epp xmlns="urn:ietf:params:xml:ns:epp-1.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:ietf:params:xml:ns:epp-1.0
    epp-1.0.xsd">
      <command>
        <create>
          <domain:create xmlns:domain="urn:ietf:params:xml:ns:domain-1.0"
          xsi:schemaLocation="urn:ietf:params:xml:ns:domain-1.0
          domain-1.0.xsd">
            <domain:name>""" + self.testDomain + """</domain:name>
            <domain:period unit="y">""" + self.years + """</domain:period>
            <domain:ns>
              <domain:hostAttr>
                <domain:hostName>""" + self.ns1 + """</domain:hostName>
              </domain:hostAttr>
              <domain:hostAttr>
                <domain:hostName>""" + self.ns2 + """</domain:hostName>
              </domain:hostAttr>
            </domain:ns>
            <domain:registrant>""" + self.clID + """</domain:registrant>
            <domain:contact type="admin">""" + self.clID + """</domain:contact>
            <domain:contact type="tech">""" + self.clID + """</domain:contact>
            <domain:contact type="billing">""" + self.clIDBilling + """</domain:contact>
          </domain:create>
        </create>
        <clTRID>""" + self.clTRID + """</clTRID>
      </command>
    </epp>
    """

    print create
    self.send_(create)
    print self.receive()
    print "\n"

  def backorder(self):
    create = """
    <?xml version="1.0" encoding="UTF-8"?>
    <epp xmlns="urn:ietf:params:xml:ns:epp-1.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:ietf:params:xml:ns:epp-1.0
    epp-1.0.xsd">
      <command>
        <create>
          <domain:create xmlns:domain="urn:ietf:params:xml:ns:domain-1.0"
          xsi:schemaLocation="urn:ietf:params:xml:ns:domain-1.0
          domain-1.0.xsd">
            <domain:name>""" + self.testDomain + """</domain:name>
            <domain:period unit="y">""" + self.years + """</domain:period>
            <domain:ns>
              <domain:hostAttr>
                <domain:hostName>""" + self.ns1 + """</domain:hostName>
              </domain:hostAttr>
              <domain:hostAttr>
                <domain:hostName>""" + self.ns2 + """</domain:hostName>
              </domain:hostAttr>
            </domain:ns>
            <domain:registrant>""" + self.clID + """</domain:registrant>
            <domain:contact type="admin">""" + self.clID + """</domain:contact>
            <domain:contact type="tech">""" + self.clID + """</domain:contact>
            <domain:contact type="billing">""" + self.clIDBilling + """</domain:contact>
          </domain:create>
        </create>
        <clTRID>""" + self.clTRID + """</clTRID>
      </command>
    </epp>
    """

    print create
    self.send_(create)
    print self.receive()
    print "\n"

  def check(self):
    order = """
      <?xml version="1.0" encoding="UTF-8"?>
      <epp xmlns="urn:ietf:params:xml:ns:epp-1.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="urn:ietf:params:xml:ns:epp-1.0
        epp-1.0.xsd">
       <command>
         <check>
           <future:check xmlns:future="http://www.dir.org/xsd/future1.0">
             <future:name>""" + self.testBackorder + """</future:name>
             <future:name>""" + self.testCheck01 + """</future:name>
             <future:name>""" + self.testCheck02 + """</future:name>
           </future:check>
         </check>
         <clTRID>""" + self.clTRID + """</clTRID>
       </command>
      </epp>
    """

    print order
    self.send_(order)
    print self.receive()
    print "\n"

  def receive(self):
    # Read first four bytes to retrieve message length.
    length = self.conn.recv(4)
    if length:
      # unpack() returns a one-element tuple.
      msg_length = struct.unpack(">I", length)[0] - 4
      received = b""
      while msg_length > len(received):
        chunk = self.conn.recv(4096)
        if chunk == b"":
          break
          # raise RuntimeError("socket connection broken")
        received += chunk
      return received

  def send_(self, msg):
    length = struct.pack(">I", len(msg) + 4 + 2)
    # Why "\r\n" has to be sent? Otherwise an connection error will occur.
    msg = msg.encode("utf-8") + b"\r\n"
    self.conn.sendall(length)
    self.conn.sendall(msg)