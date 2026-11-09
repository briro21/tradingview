import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import lib
from lib import *
a = lib.args()
STILL = os.environ.get('STILL')
def go(frames, **kw):
    finish(a, frames, **kw)
    render(a, int(STILL) if STILL else None)
