from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from pathlib import Path
import hashlib, json

root=Path(__file__).resolve().parents[1]
out=root/'dist'/'samples'
out.mkdir(parents=True,exist_ok=True)
p=out/'golden-hour-sample-certificate.pdf'
c=canvas.Canvas(str(p),pagesize=(612,792))
c.setTitle('Sample insurance certificate - Golden Hour Photography - DEMO ONLY')
c.setAuthor("I Do! fictional demo materials")
c.setFillColor(HexColor('#fcf8f5'));c.rect(0,0,612,792,fill=1,stroke=0)
c.saveState();c.translate(306,396);c.rotate(38);c.setFillColor(Color(.83,.68,.70,alpha=.17));c.setFont('Helvetica-Bold',49);c.drawCentredString(0,0,'SAMPLE - NOT VALID');c.restoreState()
c.setFillColor(HexColor('#734f62'));c.rect(38,717,536,37,fill=1,stroke=0)
c.setFillColor(HexColor('#ffffff'));c.setFont('Helvetica-Bold',11);c.drawCentredString(306,731,'FICTIONAL DEMO DOCUMENT - NO INSURANCE COVERAGE')
c.setFillColor(HexColor('#493b45'));c.setFont('Times-Roman',30);c.drawString(40,674,'Certificate of Liability Insurance')
c.setFont('Helvetica',10);c.drawString(40,652,'Illustrative onboarding attachment | Issued November 2, 2026')
def block(y,title,lines):
 c.setFillColor(HexColor('#f0e6e9'));c.rect(40,y-22,532,25,fill=1,stroke=0)
 c.setFillColor(HexColor('#734f62'));c.setFont('Helvetica-Bold',9);c.drawString(52,y-12,title)
 c.setFillColor(HexColor('#493b45'));c.setFont('Helvetica',11)
 for i,line in enumerate(lines): c.drawString(52,y-45-i*19,line)
block(617,'INSURED',['Golden Hour Photography','1200 East 6th Street, Austin, TX 78702','Contact: Alex Morgan | hello@goldenhour.example'])
block(497,'FICTIONAL PRODUCER / INSURER',['Rosewood Demo Assurance - fictional company','Policy: DEMO-GHP-2027-001','Coverage period: January 1, 2027 - December 31, 2027'])
block(377,'ILLUSTRATIVE COVERAGE LIMITS',['Commercial general liability','Each occurrence: $1,000,000','General aggregate: $2,000,000'])
block(257,'CERTIFICATE HOLDER',["I Do!",'For onboarding demonstration only.'])
c.setFillColor(HexColor('#734f62'));c.setFont('Helvetica-Bold',10);c.drawString(40,129,'SAMPLE ONLY. NOT EVIDENCE OF INSURANCE.')
c.setFillColor(HexColor('#75666f'));c.setFont('Helvetica',9)
for i,line in enumerate(['All entities, policy numbers, coverage and limits shown are fictional.',
 'This document creates no rights, coverage, contract, or insurer obligation.',
 'Use only to demonstrate receipt and review of an onboarding attachment.']): c.drawString(40,109-i*15,line)
c.setFont('Helvetica',8);c.drawRightString(572,35,'Sample attachment | Page 1 of 1')
c.save()
meta={'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'name':'Golden Hour Photography','limit':'$1,000,000 per occurrence; $2,000,000 aggregate','start':'2027-01-01','expiry':'2027-12-31','policy':'DEMO-GHP-2027-001','file':p.name}
(out/'certificate-meta.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')
print(p)
