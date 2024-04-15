#include <bits/stdc++.h>
#define ll long long int
#define print cout<<
using namespace std;
int main(){
int t;
cin>>t;
while(t--)
{
    ll n , h;
    cin>>n>>h;
    vector<int>arr(n);
    for(int i=0; i<n; i++){
      cin>>arr[i];
    }
    vector<int>sorted;
    sorted = arr;
    sort(sorted.begin() , sorted.end());
    unordered_map< int, ll>sum;
    ll s = 0;
    for(int i =0; i<n; i++){
      s+= sorted[i];
    }
    for( int i=0; i<n; i++){
     s =  s - sorted[i];
      sum[sorted[i]] = s;
    }
    vector<int>ans;
    for( int i=0; i<n; i++){
      if(h > sum[arr[i]]){
        ans.push_back(arr[i]);
      }
    }
    sort(ans.begin() , ans.end());
    print ans[0]<<'\n';
  }
}       