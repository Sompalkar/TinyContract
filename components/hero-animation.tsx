"use client"
import { motion } from "framer-motion"
import { FileText, CheckCircle, ArrowRight } from "lucide-react"

export default function HeroAnimation() {
  return (
    <div className="relative w-full max-w-[500px] aspect-video rounded-lg overflow-hidden shadow-xl bg-background border">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-[400px] p-6">
          <div className="flex flex-col space-y-6">
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-lg font-semibold">Contract Template</span>
            </motion.div>

            <motion.div
              className="h-4 bg-muted rounded-full w-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />

            <motion.div
              className="h-4 bg-muted rounded-full w-3/4"
              initial={{ width: "0%" }}
              animate={{ width: "75%" }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />

            <motion.div
              className="h-4 bg-muted rounded-full w-5/6"
              initial={{ width: "0%" }}
              animate={{ width: "83%" }}
              transition={{ delay: 1.0, duration: 0.7 }}
            />

            <motion.div
              className="flex justify-between items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">AI Generated</span>
              </div>

              <motion.div className="flex items-center gap-1 text-primary text-sm font-medium" whileHover={{ x: 5 }}>
                <span>Sign Now</span>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.6, duration: 1 }}
      />
    </div>
  )
}
