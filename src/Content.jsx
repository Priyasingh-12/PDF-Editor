import React, { useState } from 'react';
import { Document, Page, Text, View, PDFViewer,Image } from '@react-pdf/renderer';

const Content = () => {
    const initialAnnotations = [
        { text: 'pdf editor', x: 50, y: 50 },
        { text: 'image', x: 150, y: 150 },
      ];
    
      const [annotations, setAnnotations] = useState(initialAnnotations);
      const [images, setImages] = useState([]);

      const handleAddAnnotation = () => {
        const newAnnotation = {
          text: `Annotation ${annotations.length + 1}`,
          x: Math.random() * 500,
          y: Math.random() * 500,
        };
        setAnnotations([...annotations, newAnnotation]);
      };

      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const newImage = {
            src: e.target.result,
            x: Math.random() * 500,
            y: Math.random() * 500,
          };
          setImages([...images, newImage]);
        };
    
        reader.readAsDataURL(file);
      };

    return ( 
        <>
        <div className='container'>
        <button className="btn" onClick={handleAddAnnotation}>Add Annotation</button>
      <input className="inputs" type="file" accept="image/*" onChange={handleImageUpload} />

        </div>
 <div className='edit'>
      <PDFViewer width="900" height="1000">
        <Document>
          <Page size="A4">
            {annotations.map((annotation, index) => (
              <View key={index} style={{ position: 'absolute',left: annotation.x, top: annotation.y }}>
                <Text>{annotation.text}</Text>
              </View>
            ))}

            {images.map((image, index) => (
                <View key={`image-${index}`} style={{position: 'absolute', left: image.x, top: image.y }}>
                  <Image src={image.src} style={{ width: '100px', height: 'auto' }} />
                </View>
              ))}

          </Page>
        </Document>
      </PDFViewer>
      {/* <button onClick={handleAddAnnotation}>Add Annotation</button> */}
      {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}

    </div>

        </>
     );
}
 
export default Content;