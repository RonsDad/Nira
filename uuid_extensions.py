import time
import random
import uuid as _uuid

def uuid7() -> _uuid.UUID:
    """
    Generate a UUID version 7.
    """
    nanoseconds = time.time_ns()
    unix_ts_ms = nanoseconds // 1000000
    
    # Correctly mask to 48 bits
    masked_unix_ts_ms = unix_ts_ms & 0xFFFFFFFFFFFF
    
    rand_bits = random.getrandbits(74)
    
    # Construct the 128-bit integer for the UUID
    new_int = (masked_unix_ts_ms << 80) | (0x7 << 76) | rand_bits
    
    return _uuid.UUID(int=new_int)

def uuid7str() -> str:
    """
    Generate a UUID version 7 as a string.
    """
    return str(uuid7())
