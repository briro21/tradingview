"""Check that every item-level `at` phrase falls inside its beat window.

    python3 scripts/check_items.py src/episodes/ep9/scenes.ts src/episodes/ep9/timing.json
"""
import json,re,sys
src=open(sys.argv[1]).read(); T=json.load(open(sys.argv[2]))
norm=lambda s: re.sub(r"[^a-z0-9]","",s.lower())
def find(words,ph,f):
    t=norm(ph)
    for i in range(f,len(words)):
        j,x=i,""
        while j<len(words) and len(x)<len(t): x+=norm(words[j][0]); j+=1
        if x==t: return i
    return -1
pat=re.compile(r'(?:export )?const (S\w+): Beat\[\] = \[(.*?)\n\];',re.S)
bad=0
for sid,body in pat.findall(src):
    key=sid if sid in T else sid.replace('S','SH',1)
    words=T[key]['words']
    toks=[(m.group(1), bool(re.match(r'\s*\}\)',body[m.end():]))) for m in re.finditer(r'at: "((?:[^"\\]|\\.)*)"',body)]
    # CTA("...") beats
    beats=[]; cur=None
    for ph,item in toks:
        if not item: cur=[ph,[]]; beats.append(cur)
        else: cur[1].append(ph)
    idx=0; starts=[]
    for b in beats:
        f=find(words,b[0],idx); starts.append(f); idx=f+1
    for k,b in enumerate(beats):
        s=starts[k]; e=starts[k+1] if k+1<len(starts) else len(words)
        for ph in b[1]:
            j=find(words,ph,max(s,0))
            if j<0 or j>=e: bad+=1; print(sid,'|',b[0],'| item',repr(ph),'found' if j>=0 else 'MISSING', j, 'beat', s, e)
print('item issues:',bad)
