# New hook: VO + synthesized SFX -> public/hook.wav, src/hook_timeline.json
import re,json,wave
import numpy as np
src=open(__file__.replace('hook_audio.py','audio.py')).read().split('# timeline from VO')[0]
exec(src)
vo=[rd(f'{D}/voice/hk{i}.wav') for i in range(4)]
at=[2.0,9.4,11.65,14.9]
T=at[3]+len(vo[3])/SR+2.3
M=np.zeros(int(T*SR)); V=np.zeros_like(M)
def add(buf,x,a,g=1.):
    k=int(a*SR)
    if k>=len(buf): return
    x=x[:len(buf)-k]; buf[k:k+len(x)]+=x*g
for i,v in enumerate(vo): add(V,v,at[i])
# 0-2 s: black, ragged breath + accelerating heartbeat
add(M,lp(noise(2.0),500)*np.abs(np.sin(2*np.pi*1.1*t(2.0)))**3*.6,0)
add(M,heartbeat(2.0,80)*.8,0)
# 2-8.7 cave: heartbeat, wind, low cello, rumble, glitch stabs
add(M,heartbeat(7.4,125)*.9,2.0); add(M,wind(7.4)*.5,2.0); add(M,cello(7.4)*.5,2.0)
add(M,lp(noise(7.4),120)*.5,2.0)
for a in (4.4,6.1,7.9): add(M,glitch(.25)*.4,a)
add(M,riser(2.6)*.5,6.2)
# 9.3 impact "not human"
add(M,subdrop(3)*1.1,9.3); add(M,whip()*.8,9.3); add(M,glitch(.5)*.5,9.4)
# silence 10.3-10.6, then hit on question card
add(M,subdrop(2.5)*1.2,10.6); add(M,clink()*.5,10.62)
# montage riser
add(M,riser(2.9)*1.0,11.55)
for k in range(7): add(M,whip()*.5,11.65+k*.4)
# bass drop + oldman
add(M,subdrop(3)*1.2,14.5); add(M,pad(6,[130.8,155.6,196])*.5,14.5); add(M,steps(3,1.4)*.0,14.5)
add(M,hum(4.0)*.8,17.0); add(M,glitch(2.5)*.35,18.0)
# end
add(M,subdrop(3)*1.2,T-2.2); add(M,wind(2.2)*.4,T-2.2)
M=lp(M,9000)
duck=np.ones_like(M)
for i,v in enumerate(vo):
    k=int((at[i]-.15)*SR); duck[k:k+len(v)+int(.3*SR)]=.45
M*=duck
mix=M/np.max(np.abs(M))*.75*.85+V/np.max(np.abs(V))*.9
mix/=max(1,np.max(np.abs(mix))/.97)
w=wave.open(D+'/public/hook.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((mix*32767).astype(np.int16).tobytes()); w.close()
json.dump({'at':at,'total':round(T,3)},open(D+'/src/hook_timeline.json','w'))
print(at,T)
