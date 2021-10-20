@echo off

title 资源文件搜索
echo 正在搜索当前目录下的资源文件.......  

REM  '>' 清空原txt文档中的数据下写入，而 '>>'则是在保留原来数据的前提下写入

REM 当前时间
for /F "usebackq tokens=1,2 delims==" %%i in (`wmic os get LocalDateTime /VALUE 2^>NUL`) do if '.%%i.'=='.LocalDateTime.' set ldt=%%j
set ldt=%ldt:~0,4%-%ldt:~4,2%-%ldt:~6,2% %ldt:~8,2%:%ldt:~10,2%:%ldt:~12,6%



echo /* Site resources file. Created at %ldt% */ > "manifest.txt"


echo var manifest = [ >> "manifest.txt"


  
for %%G in (.jpg,.jpeg,.png,.gif,.css,.js,.mp3,.mp4) do (
  for /f "delims=" %%A in ('forfiles /s /m *%%G /c "cmd /c echo @relpath"') do (
      set "file=%%~A"
      setlocal enableDelayedExpansion

      echo '!file:~2!', >> "manifest.txt"
      endlocal
  )
)

echo ]; >> "manifest.txt"


echo 临时文件创建完成

del manifest.js
setlocal ENABLEDELAYEDEXPANSION
set filein="manifest.txt"
set fileout="manifest.js"
set old=\
set new=/
for /f "tokens=* delims=" %%i in ( '"type %filein%"') do (
    set str=%%i
    set str=!str:%old%=%new%!
    echo !str! >> %fileout%
)

del manifest.txt
echo 处理完成!  
pause