#!/bin/bash
rm TheLordOfTheRingsLCG*.seext
rm TheLordOfTheRingsLCG*.zip

cd TheLordOfTheRingsLCG; zip -r ../TheLordOfTheRingsLCG.seext *; cd ..
cd TheLordOfTheRingsLCG-A; zip -r ../TheLordOfTheRingsLCG-A.seext *; cd ..
cd TheLordOfTheRingsLCG-B; zip -r ../TheLordOfTheRingsLCG-B.seext *; cd ..
cd TheLordOfTheRingsLCG-E; zip -r ../TheLordOfTheRingsLCG-E.seext *; cd ..
cd TheLordOfTheRingsLCG-I; zip -r ../TheLordOfTheRingsLCG-I.seext *; cd ..
cd TheLordOfTheRingsLCG-P; zip -r ../TheLordOfTheRingsLCG-P.seext *; cd ..
cd TheLordOfTheRingsLCG-V; zip -r ../TheLordOfTheRingsLCG-V.seext *; cd ..
