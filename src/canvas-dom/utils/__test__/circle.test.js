import {circleMove,pointInTriangle,circleMoveMutateR} from '../circle'

test('inside:at boundary:point (1,1) should in triangle (02,22,20)', () => {
  expect(pointInTriangle([0,2],[2,2],[2,0],[1,1])).toBe(true);
});
test('inside:at boundary:point (2,1) should in triangle (02,22,20)', () => {
  expect(pointInTriangle([0,2],[2,2],[2,0],[2,1])).toBe(true);
});
test('inside:at boundary:point (1,2) should in triangle (02,22,20)', () => {
  expect(pointInTriangle([0,2],[2,2],[2,0],[1,2])).toBe(true);
});

test('inside:not at boundary:point (1.2,1.2) should in triangle (02,22,20)', () => {
  expect(pointInTriangle([0,2],[2,2],[2,0],[1.2,1.2])).toBe(true);
});

test('outside:point (0.7,0.8) should not in triangle (02,22,20)', () => {
  expect(pointInTriangle([0,2],[2,2],[2,0],[0.7,0.8])).toBe(false);
});

test('angel30 should move ', () => {
  function check(rec,exp){
    return Math.abs(rec[0]-exp[0])<0.01 && Math.abs(rec[1]-exp[1])<0.01
  }
  let center=[0,0]
  let end1=circleMove([5.51,-8.34],center,2*Math.PI/360*34.7,true)
  let end1_2=circleMove([8.66,4.99],center,2*Math.PI/360*90.12,true)
  let end2=circleMove([-3.46,-9.38],center,2*Math.PI/360*46.89,false)
  let end2_2=circleMove([6.26,-7.79],center,2*Math.PI/360*258.85,false)
  let end2_3=circleMove([9.42*0.884,(-3.36)*0.884],[0,0],2*Math.PI/360*133.11,false)
  let end2_4=circleMove([7.57*0.719+10,(-6.54)*0.719+10],[10,10],2*Math.PI/360*66.46,true)

  expect(check(end1,[9.28,-3.72])).toBe(true);
  expect(check(end1_2,[-5.01,8.65])).toBe(true);
  expect(check(end2,[-9.22,-3.88])).toBe(true);
  expect(check(end2_2,[6.44,7.65])).toBe(true);
  expect(check(end2_3,[-7.86,-4.05])).toBe(true);
  expect(check(end2_4,[16.48,13.11])).toBe(true);
});

test('mutateR angel30 should move ', () => {
  function check(rec,exp){
    return Math.abs(rec[0]-exp[0])<0.1 && Math.abs(rec[1]-exp[1])<0.1
  }
  let r=10
  let center=[10,10]
  let end1=circleMoveMutateR([15.51,-8.34+10],center,2*Math.PI/360*34.7,true,r,r)
  let end1_2=circleMoveMutateR([16.26,-7.79+10],center,2*Math.PI/360*258.85,false,r,r)

  let end2=circleMoveMutateR([17.57,-6.54+10],center,2*Math.PI/360*66.46,true,r,7.19)
  let end2_2=circleMoveMutateR([19.42,-3.36+10],center,2*Math.PI/360*133.11,false,r,8.84)
  let end2_3=circleMoveMutateR([12.11,19.78],center,2*Math.PI/360*27.04,true,r,8.84)
  let end2_4=circleMoveMutateR([12.11,19.78],center,2*Math.PI/360*67.32,true,r,8.84)
  let end2_5=circleMoveMutateR([77.76829779008143,254.08955223880596],[96,72],0.3490658503988659,true,183,182)

  expect(check(end1,[19.28,-3.72+10])).toBe(true);
  expect(check(end1_2,[16.44,17.65])).toBe(true);
  expect(check(end2,[16.48,13.11])).toBe(true);
  expect(check(end2_2,[-7.86+10,-4.05+10])).toBe(true);
  expect(check(end2_3,[-2.27+10,18.54])).toBe(true);
  expect(check(end2_4,[-7.25+10,15.05])).toBe(true);
  expect(check(end2_5,[17.02,235.97])).toBe(true);

  // expect(end1).toBe(true);
  // expect(end1_2).toBe(true);
  // expect(end2).toBe(true);
  // expect(end2_2).toBe(true);
  // expect(end2_3).toBe(true);
  // expect(end2_4).toBe(true);
  // expect(end2_5).toBe(true);
});