'''def counter(up_to):
    i = 0
    yield "START"
    while i <= up_to:
        yield i
        i += 1
    yield "END"

my_cnt = counter(5)'''

#for elem in my_cnt:
#    print(elem)

def sample_sequence():
    yield 2
    yield 12
    yield 82
    yield 'Ноль'
    yield 6

seq = sample_sequence()

'''for _ in range(3):
    print(next(seq))

next(seq)
next(seq)
next(seq)'''

def fib():
    a,b = 0,1
    while True:
        yield a
        a,b = b, a + b

sequence = fib()
#for _ in range(20):
#    print(next(sequence))

#my_counter = counter(10)
#for i, elem in enumerate(my_counter):
#    if i < 5:
#        continue
#    print(elem)

def counter(up_to):
    i = 0
    while i < up_to:
        val = (yield i)
        if val is None:
            i += 1
        else:
            i = val
cnt = counter(10)

