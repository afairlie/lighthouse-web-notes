# Interview Question 3

### this showed me I need to practice A LOT more for interviews, and I need to specifically practice whiteboarding, because I use console.log() to visualize output as I build functions instead of thinking through the logic as I go.

```
input:
  
  {
  'Alice': ['Bob', 'Carol'],
  'Bob':   [],
  'Carol': ['Dean'],
  'Dean':  ['Elise'],
  'Elise': ['Bob', 'Carol'],
}
  
Expected Output

  {
  'Alice': [],
  'Bob':   ['Alice', 'Elise'],
  'Carol': ['Alice', 'Elise'],
  'Dean':  ['Carol'],
  'Elise': ['Dean']
}
  
function getLosers (winners) {
  const losers = {};
  
  // map winners 
    // alice key, losers bob = [alice], carol = [alice]
  winners.map(winner => {
    if (!losers.winner) { losers[winner] = []; }
    winner.forEach(loser => {
      if (!losers.loser) { losers[winner] = [];}
      losers[loser].push(winner)
    })
  })
  
  
  return losers;
}
  
// working answer:
  
  function getLosers (winners) {
    const losers = {};
    for (const winner in winners) {
      if (!losers[winner]){losers[winner] = []}
      for (const loser of winners[winner]) {
        if (!losers[loser]){losers[loser] = []}
        losers[loser].push(winner)
      }
      
    }
    return losers;
  }
```
