import timeit

def test01():
    a = []
    for i in range(800):
        a.append(i)

def test02():
    a = [None] * 1000
    for i in range(len(a)):
        a[i] = i


elapsed_time = timeit.timeit(test01, number=100)/100
elapsed_time2 = timeit.timeit(test02, number=100)/100

print(elapsed_time)
print(elapsed_time2)
print(str(elapsed_time2*100/elapsed_time),'%');

