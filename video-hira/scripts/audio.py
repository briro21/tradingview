import numpy as np, json, wave, os
from scipy.signal import butter, sosfilt
SR=44100; D=os.path.dirname(os.path.abspath(__file__))+'/..'
rng=np.random.default_rng(1)
def rd(p):
    w=wave.open(p); a=np.frombuffer(w.readframes(w.getnframes()),np.int16)/32768; r=w.getframerate()
    return np.interp(np.arange(0,len(a)*SR/r)*r/SR, np.arange(len(a)), a)
def lp(x,f): return sosfilt(butter(2,f,'low',fs=SR,output='sos'),x)
def hp(x,f): return sosfilt(butter(2,f,'high',fs=SR,output='sos'),x)
def bp(x,a,b): return sosfilt(butter(2,[a,b],'band',fs=SR,output='sos'),x)
def t(d): return np.arange(int(d*SR))/SR
def env(n,a,r): e=np.ones(n); ka=int(a*SR); kr=int(r*SR); e[:ka]=np.linspace(0,1,ka) if ka else 1; e[n-kr:]*=np.linspace(1,0,kr); return e
def noise(d): return rng.standard_normal(int(d*SR))
def thump(f=55,d=.25): x=t(d); return np.sin(2*np.pi*f*x*(1-.3*x))*np.exp(-x*18)
def heartbeat(d,bpm):
    o=np.zeros(int(d*SR)); p=60/bpm; s=0
    while s<d-.4:
        for off,g in((0,1),(.18,.7)):
            k=int((s+off)*SR); h=thump()*g; o[k:k+len(h)]+=h[:len(o)-k]
        s+=p
    return o
def subdrop(d=2.5): x=t(d); f=80*np.exp(-x*1.2)+28; return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-x*1.3)
def riser(d): x=t(d); f=200*(8**(x/d)); return (.4*np.sin(2*np.pi*np.cumsum(f)/SR)+.3*hp(noise(d),1500)*(x/d))*(x/d)**1.5
def saw(f,d): x=t(d); return 2*((x*f)%1)-1
def cello(d,fs=(65.4,69.3,98)):
    x=t(d); o=sum(lp(saw(f*(1+.003*np.sin(2*np.pi*5*x)),d),700) for f in fs); return o/len(fs)*env(len(x),1.2,1.5)
def glitch(d):
    o=np.zeros(int(d*SR)); 
    for _ in range(int(d*14)):
        k=rng.integers(0,len(o)-3000); L=rng.integers(300,3000); o[k:k+L]+=np.sign(np.sin(np.arange(L)*rng.uniform(.05,.6)))*.5
    x=t(d); f=900*np.exp(-x*.8)+120; o+=.35*np.sin(2*np.pi*np.cumsum(f)/SR)*np.sign(np.sin(2*np.pi*30*x))
    return o
def wind(d): x=t(d); return lp(noise(d),500)*(.6+.4*np.sin(2*np.pi*.15*x))*.6
def crowd(d): return sum(bp(noise(d),300+i*150,500+i*160)*(.5+.5*np.sin(2*np.pi*rng.uniform(1,4)*t(d)+i)) for i in range(5))*.25
def clink(): x=t(.4); return sum(np.sin(2*np.pi*f*x) for f in(2400,3710,5120))*np.exp(-x*14)/3
def whip(): x=t(.25); return hp(noise(.25),2000)*np.exp(-x*30)*1.5
def groan(d=1.2): x=t(d); f=110+30*np.sin(2*np.pi*.8*x); return lp(saw(1,d)*0+np.sign(np.sin(2*np.pi*np.cumsum(f)/SR)),600)*env(len(x),.2,.5)*.3
def creak(d=.8): x=t(d); return bp(np.sign(np.sin(2*np.pi*np.cumsum(30+20*np.sin(9*x))/SR)),200,900)*env(len(x),.05,.3)*.5
def steps(d,rate=1.6):
    o=np.zeros(int(d*SR)); s=0
    while s<d-.3:
        k=int(s*SR); h=lp(noise(.12),900)*np.exp(-t(.12)*40); o[k:k+len(h)]+=h; s+=1/rate
    return o
def hum(d): x=t(d); f=60*(3**(x/d)); return (np.sin(2*np.pi*np.cumsum(f)/SR)+.4*np.sin(4*np.pi*np.cumsum(f)/SR))*(x/d)*.5
def pad(d,fs): x=t(d); return sum(np.sin(2*np.pi*f*x)*(1+.2*np.sin(2*np.pi*.2*x)) for f in fs)/len(fs)*env(len(x),2,2)

# timeline from VO
vo=[rd(f'{D}/voice/vo{i}.wav') for i in range(8)]
lead=[1.0,.4,.4,.4,.5,.4,.4,.4]
dur=[lead[i]+len(v)/SR+.7 for i,v in enumerate(vo)]; dur[0]+=0.3
starts=np.concatenate([[0],np.cumsum(dur)]); T=starts[-1]+1.5
M=np.zeros(int(T*SR)); V=np.zeros_like(M)
def add(buf,x,at,g=1.):
    k=int(at*SR); x=x[:len(buf)-k]; buf[k:k+len(x)]+=x*g
for i,v in enumerate(vo): add(V,v,starts[i]+lead[i])
s=starts
# scene 0 hook
add(M,lp(noise(dur[0]-1.4),400)*np.abs(np.sin(2*np.pi*.9*t(dur[0]-1.4)))**3*.5,s[0])
add(M,heartbeat(dur[0]-1.2,120)*.9,s[0]); add(M,subdrop()*.9,s[1]-1.4)
# scene 1 riser
add(M,hum(dur[1])*.35,s[1]); add(M,riser(dur[1])*.35,s[1])
# 2 cello
add(M,cello(dur[2]+1.5)*.45,s[2])
# 3 glitch rewind
add(M,glitch(dur[3])*.18,s[3])
# 4 wind/heat
add(M,wind(dur[4]+dur[5])*.5,s[4]); add(M,pad(dur[4],(220,277,330))*.15,s[4])
# 5 market
add(M,crowd(dur[5])*.6,s[5]); [add(M,clink()*.5,s[5]+x) for x in (.8,1.9,2.6,3.9)]; add(M,groan()*.6,s[5]+2.2)
# 6 caravan
add(M,steps(dur[6],2.2)*.6,s[6]); add(M,creak()*.6,s[6]+.5); add(M,creak()*.6,s[6]+2.6); add(M,whip()*.6,s[6]+1.6); add(M,wind(dur[6])*.3,s[6])
# 7 pilgrims
add(M,steps(dur[7]+1.5,3.0)*env(int((dur[7]+1.5)*SR),1.5,1.2)*.5,s[7]); add(M,pad(dur[7]+1.5,(147,220,294))*.15,s[7])
mix=V*1.0+M*0.55; mix/=max(1,np.abs(mix).max()/0.95)
w=wave.open(f'{D}/public/pilot.wav','w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix*32767).astype(np.int16).tobytes()); w.close()
json.dump({'starts':list(map(float,starts[:-1])),'durs':list(map(float,dur)),'total':float(T)},open(f'{D}/src/timeline.json','w'),indent=1)
print(T)
