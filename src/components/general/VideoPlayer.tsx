'use client';
import { Box, HStack, VStack } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { Play, Pause, Maximize2, VolumeSlash, VolumeHigh } from 'iconsax-react'
import { THEME } from '@/theme';

function VideoPlayer({
    src, width = 100, height = 200, measureType = 'px'
}:{
    src: string,
    width?: number;
    height?: number;
    measureType: 'px'|'%'
}) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(true);
    const [showControl, setShowControl] = React.useState(false);
    const [heightt, setHeight]= React.useState(0);
    const [wiidth, setWidth] = React.useState(0);
    const [inView, setInView] = React.useState(false);

    const videoRef = useRef<HTMLVideoElement>();
    const boxRef = useRef<HTMLDivElement>();

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            (videoRef.current as HTMLVideoElement).muted = true;
            // (videoRef.current as HTMLVideoElement).currentTime = 0;
            setIsPlaying(true);
            videoRef.current?.play();
          } else {
            setIsPlaying(false);
            videoRef.current?.pause();
          }
        }, {
            threshold: 1
        });
      
        if (videoRef.current) {
          observer.observe(videoRef.current);
        }
      
        return () => {
          if (videoRef.current) {
            observer.unobserve(videoRef?.current);
          }
        };
      }, [videoRef]);

      const hanldeMute = () => {
        if (!isMuted  ) {
          setIsMuted(true);
          (videoRef.current as HTMLVideoElement).muted = true;
        } else {
          setIsMuted(false);
          (videoRef.current as HTMLVideoElement).muted = false;
        }
      }
      

    React.useEffect(() => {
        const video = boxRef.current;
    
        const handleLoadedMetadata = () => {
          const videoHeight = video?.clientHeight as number;
          const videoWidth = video?.clientWidth as number;
          const aspectRatio = videoWidth / videoHeight;
          const newHeight = 250 / aspectRatio;
          setWidth(videoWidth)
          setHeight(newHeight);
        };
    
        video?.addEventListener('loadedmetadata', handleLoadedMetadata);
    
        return () => {
          video?.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      }, []);

    const handlePlayPause = React.useCallback(() => {
        if (videoRef.current?.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    }, []);

    const handleDoubleClick = () => {
        const video = videoRef.current;
    
        if (videoRef.current?.paused) {
          videoRef.current?.requestFullscreen();
        }
      };

  return (
   <Box ref={boxRef as any} onDoubleClick={handleDoubleClick} onMouseOver={() => setShowControl(true)} onMouseOut={() => setShowControl(false)} width={'100%'} height={'100%'} maxH={'250px'} overflow={'hidden'} position={'relative'}>
     <video ref={videoRef as any} style={{ width: '100%', height: '100%', maxHeight: '250px',}} onEnded={() => {
      setIsPlaying(false);
      videoRef?.current?.pause();
     }}>
        <source type='video/mp4' src={src}  />
    </video>
    {
        showControl && (
            <HStack width='100%' height={'50px'} justifyContent={'space-between'} bg={'#00000054'} position={'absolute'} bottom={'0'} paddingX='10px'>
                <HStack onClick={handlePlayPause} cursor={'pointer'}  justifyContent='center' alignItems={'center'} width={'30px'} height={'30px'} borderRadius={'15px'} bg='white'>
                    { !isPlaying && <Play size='20px' variant='Linear' color={THEME.COLORS.chasescrollButtonBlue} /> }
                    { isPlaying && <Pause size='20px' variant='Linear' color={THEME.COLORS.chasescrollButtonBlue}  />}
                </HStack>

                <HStack>
                  <HStack marginRight={'10px'} cursor={'pointer'}  justifyContent='center' alignItems={'center'} width={'30px'} height={'30px'} borderRadius={'15px'} bg='white'>
                      { isMuted && <VolumeSlash size='20px' variant='Linear' color={THEME.COLORS.chasescrollButtonBlue} onClick={hanldeMute} /> }
                      { !isMuted && <VolumeHigh size='20px' variant='Linear' color={THEME.COLORS.chasescrollButtonBlue} onClick={hanldeMute} />}                  
                  </HStack>
                  <HStack onClick={handlePlayPause} cursor={'pointer'}  justifyContent='center' alignItems={'center'} width={'30px'} height={'30px'} borderRadius={'15px'} bg='white'>
                      <Maximize2 onClick={handleDoubleClick} size='20px' variant='Linear' color={THEME.COLORS.chasescrollButtonBlue} />
                  </HStack>
                </HStack>
            </HStack>
        )
    }
   </Box>
  )
}

export default VideoPlayer