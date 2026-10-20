export type Certification = {id:string;name:string;issuer:string;date:string;credentialId?:string;url?:string;award?:boolean;detail:string};
export const certifications:Certification[]=[
{id:'ux',name:'UX Challenge - Proyecto Ganador',issuer:'Universidad Maimónides',date:'September 2023',url:'https://drive.google.com/file/d/1kcKTnxYJsCseZg-Y1RixHXg7wYIpeqns/view',award:true,detail:'Winning project in a UX design challenge.'},
{id:'sql-intermediate',name:'SQL (Intermediate) Certificate',issuer:'HackerRank',date:'August 2023',credentialId:'7E0AD8FA60CA',url:'https://www.hackerrank.com/certificates/7e0ad8fa60ca',detail:'Intermediate SQL assessment.'},
{id:'google',name:'Google Cloud Computing Foundations',issuer:'Google Digital Academy (Skillshop)',date:'September 2023',url:'https://drive.google.com/file/d/1JYSOQA--B-02krVYvpaEMDfahCSQq7tj/view',detail:'Foundational cloud computing concepts.'},
{id:'sql-basic',name:'SQL (Basic) Certificate',issuer:'HackerRank',date:'April 2023',credentialId:'670C123968D0',url:'https://www.hackerrank.com/certificates/670C123968D0',detail:'Basic SQL assessment.'},
{id:'csharp',name:'C# (Basic) Certificate',issuer:'HackerRank',date:'January 2023',credentialId:'7FBB28E605D4',url:'https://www.hackerrank.com/certificates/7fbb28e605d4',detail:'Basic C# assessment.'}
];
